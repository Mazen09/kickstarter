import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import MiniPost from "./common/miniPost";
import { getExpertCategories } from "../services/categoryService";
import { getReviewPosts } from "./../services/postService";
import LoadingOverlay from "react-loading-overlay";
import auth from "../services/authService";

class Review extends Form {
  state = {
    data: {
      category: ""
    },
    errors: {},
    categories: [],
    posts: [],
    lastKey: "",
    prevKey: "none",
    prevCategory: "",
    loading: false
  };

  schema = {
    category: Joi.string()
      .required()
      .label("Category")
  };

  async componentDidMount() {
    const { data } = await getExpertCategories(auth.getCurrentUser());
    this.setState({ categories: data });
  }

  async componentDidUpdate() {
    const { category } = this.state.data;
    let { prevCategory, loading, lastKey, prevKey } = this.state;
    if (category !== prevCategory && lastKey !== prevKey) {
      loading = true;
      this.setState({ loading });
      this.updateState(true); // true => reset the posts list
      document.addEventListener("scroll", this.handleScroll);
    }
  }

  updateState = async reset => {
    let { posts, lastKey, prevKey, loading, prevCategory } = this.state;
    let { category } = this.state.data;
    if (reset) lastKey = "";

    const { data } = await getReviewPosts(category, lastKey);
    const { posts: newposts, lastKey: newlastkey } = data;
    // console.log(
    //   "prev key: ",
    //   prevKey,
    //   ", lastkey to be called: ",
    //   lastKey,
    //   ", new lastkey",
    //   newlastkey
    // );
    if (reset) {
      posts = newposts;
    } else {
      if (lastKey !== newlastkey) {
        posts = posts.concat(newposts);
      }
    }
    prevKey = lastKey;
    lastKey = newlastkey;
    prevCategory = category;
    loading = false;
    this.setState({ posts, lastKey, prevCategory, loading });
  };

  handleScroll = async () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const { lastKey, prevKey, prevCategory } = this.state;
    const { category } = this.state.data;
    if (
      scrollable - scrolled < 10 &&
      lastKey !== null &&
      lastKey !== prevKey &&
      category !== "" &&
      category === prevCategory
    ) {
      // console.log(scrollable, scrolled, lastKey);
      // console.log(this.state.posts);
      this.updateState(false); // false => append to the current posts list
    }
    if (lastKey === null) {
      document.removeEventListener("scroll", this.handleScroll);
    }
  };

  render() {
    const { posts, categories, loading } = this.state;
    return (
      <LoadingOverlay active={loading} spinner text="Please Wait...">
        <div className="card" style={{ margin: 10 }}>
          <div className="card-body">
            <h4 className="card-title">Choose Category</h4>
            {/* {console.log("posts: ", posts)} */}
            {this.renderSelect(
              "category",
              "Category",
              categories,
              "Category",
              "Category"
            )}
          </div>
        </div>
        {posts.length === 0 && this.state.data.category !== "" && (
          <h4>No avillable posts for that category</h4>
        )}
        <div className="container" style={{ margin: 10 }}>
          {posts.map(minipost => (
            <MiniPost
              key={minipost.id}
              id={minipost.id}
              username={minipost.username}
              date={minipost.date}
              category={minipost.category}
              title={minipost.title}
              type={"reviewPost"}
            />
          ))}
        </div>
      </LoadingOverlay>
    );
  }
}

export default Review;
