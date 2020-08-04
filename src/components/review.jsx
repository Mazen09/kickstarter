import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import MiniPost from "./miniPost";
import { getExpertCategories } from "../services/categoryService";
import { getReviewPosts } from "./../services/postService";

class Review extends Form {
  state = {
    data: {
      category: ""
    },
    errors: {},
    categories: [],
    posts: [],
    lastKey: "",
    prevCategory: ""
  };

  schema = {
    category: Joi.string()
      .required()
      .label("Category")
  };

  componentDidMount() {
    const categories = getExpertCategories("0");
    this.setState({ categories });
    document.addEventListener("scroll", this.handleScroll);
    // console.log(categories);
  }

  async componentDidUpdate() {
    const { category } = this.state.data;
    let { prevCategory } = this.state;
    console.log("lastkey: ", this.state.lastKey);
    if (category !== prevCategory) {
      const lastKey = "";
      this.setState({ lastKey });
      this.updateState(true); // true => reset the posts list
      prevCategory = category;
      this.setState({ prevCategory });
    }
  }

  updateState = async reset => {
    let { posts, lastKey } = this.state;
    let { category } = this.state.data;
    const { data } = await getReviewPosts(category, lastKey);
    const { posts: newposts, lastKey: newlastkey } = data;
    lastKey = newlastkey;
    if (reset) {
      posts = newposts;
    } else {
      if (lastKey !== newlastkey) {
        posts = posts.concat(newposts);
      }
    }
    this.setState({ posts, lastKey });
  };

  handleScroll = async () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const { lastKey, prevCategory } = this.state;
    const { category } = this.state.data;
    console.log(scrollable, scrolled, lastKey);
    if (
      scrollable - scrolled < 10 &&
      lastKey !== null &&
      category !== "" &&
      category === prevCategory
    ) {
      this.updateState(false); // false => append to the current posts list
    }
    if (lastKey === null) {
      document.removeEventListener("scroll", this.handleScroll);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="card" style={{ margin: 10 }}>
          <div className="card-body">
            <h4 className="card-title">Choose Category</h4>
            {console.log(this.state.data.category)}
            {this.renderSelect(
              "category",
              "Category",
              this.state.categories,
              "name",
              "name"
            )}
          </div>
        </div>
        <div className="container" style={{ margin: 10 }}>
          {this.state.posts.map(minipost => (
            <MiniPost
              key={minipost.id}
              id={minipost.id}
              username={minipost.username}
              date={minipost.date}
              category={minipost.category}
              title={minipost.title}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Review;
