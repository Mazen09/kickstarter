import React, { Component } from "react";
import auth from "../services/authService";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

class Account extends Component {
  state = {
    account: {},
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.getAccountInfo();
  }

  getAccountInfo = async () => {
    try {
      const { data: account } = await auth.getAccount(auth.getCurrentUser());
      this.setState({ account, loading: false });
    } catch (ex) {
      this.setState({ loading: false });
      toast.error("Error ocuured. Please try again later.");
    }
  };

  renderList = () => {
    const { account } = this.state;
    const fields = Object.keys(account);
    const items = [];
    fields.forEach(field => {
      items.push(
        <tr key={field}>
          <th scope="row"></th>
          <td>
            <b>{field}:</b>
          </td>
          <td>{account[field]}</td>
        </tr>
      );
    });
    return items;
  };

  render() {
    const { account, loading } = this.state;
    return (
      <LoadingOverlay active={loading} spinner text="Please Wait...">
        <div className="card" style={{ margin: 10 }}>
          <div className="card-body">
            {account["username"] && (
              <React.Fragment>
                <h4 className="card-title">
                  Account Page for {account["username"]}
                </h4>
                <table className="table table-striped">
                  <tbody>{this.renderList()}</tbody>
                </table>
              </React.Fragment>
            )}
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default Account;
