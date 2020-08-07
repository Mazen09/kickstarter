import React, { Component } from "react";
import auth from "../services/authService";
import MiniPost from "./miniPost";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

class Profile extends Component {
  state = {
    info: {},
    posts: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.getProfileInfo();
  }

  getProfileInfo = async () => {
    const { user } = this.props.match.params;
    try {
      const { data } = await auth.getProfile(user);
      const info = { ...data };
      delete info.posts;
      info.expertises = this.ListToString(info.expertises);
      const posts = data.posts;
      this.setState({ info, posts, loading: false });
    } catch (ex) {
      this.setState({ loading: false });
      toast.error("Error ocuured. Please try again later.");
    }
  };

  ListToString = lst => {
    let result = "";
    lst.forEach(element => {
      result = result + `- ${element.Category} \n`;
    });
    return result;
  };

  renderList = () => {
    const { info } = this.state;
    const fields = Object.keys(info);
    const items = [];
    fields.forEach(field => {
      items.push(
        <tr key={field}>
          <th scope="row"></th>
          <td>
            <b>{field}:</b>
          </td>
          <td>{info[field]}</td>
        </tr>
      );
    });
    return items;
  };

  render() {
    const { info, posts, loading } = this.state;

    return (
      <LoadingOverlay active={loading} spinner text="Please Wait...">
        <div className="card" style={{ margin: 10 }}>
          <div className="card-body">
            {info["username"] && (
              <React.Fragment>
                <h4 className="card-title">
                  Account Page for {info["username"]}
                </h4>
                <table className="table table-striped">
                  <tbody>{this.renderList()}</tbody>
                </table>
              </React.Fragment>
            )}
          </div>
        </div>
        {info["username"] && posts.length === 0 && (
          <h4>No avillable posts for this user</h4>
        )}
        <div className="container" style={{ margin: 10 }}>
          {posts.map(minipost => (
            <MiniPost
              key={minipost.PostId}
              id={minipost.PostId}
              username={minipost.Username}
              date={minipost.Date}
              category={minipost.Category}
              title={minipost.Title}
              type={"post"}
            />
          ))}
        </div>
      </LoadingOverlay>
    );
  }
}

export default Profile;
