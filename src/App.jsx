import React from "react";
import { Table, Button, Popover } from "antd";
import { ThunderboltOutlined, BookOutlined } from "@ant-design/icons";
import _ from "lodash";
import { columns } from "./static/data";
import "antd/dist/antd.css";
import "./App.css";

const parseResponse = (resData) => {
  let parseData = resData.map((data) => {
    const parsedData = {
      key: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      website: data.website,
    };
    return parsedData;
  });
  return parseData;
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      selectedRowKeys: [],
      selectedRows: [],
    };
  }

  componentDidMount() {
    // To Slow Down the Action - Mocking Slow Response/ Alternate way to config network in browser tool
    setTimeout(
      () =>
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((resData) =>
            this.setState({
              tableData: parseResponse(resData),
            })
          ),
      3000
    );
  }
  // onSelectionChange selected rowKeys and row object & updates the state
  onSelectionChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  // Accept method just gives alert with the desired selection
  onAccept = (selectedRowKeys) => {
    !_.isEmpty(selectedRowKeys) ?
      this.setState(
        {
          selectedRowKeys: [],
          selectedRows: [],
        },
        () => alert(`${selectedRowKeys.toString()} have been Accepted`)
      ) : alert('Kindly Select to Approve')
  };

  // Reject method just gives alert with the desired selection
  onReject = (selectedRowKeys) => {
    !_.isEmpty(selectedRowKeys) ?
      this.setState(
        {
          selectedRowKeys: [],
          selectedRows: [],
        },
        () => alert(`${selectedRowKeys.toString()} have been Rejected`)
      ) : alert('Kindly Select to Reject')
  };

  render() {
    const { tableData, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (newSelectedRowKeys, selectedRows) => {
        this.onSelectionChange(newSelectedRowKeys, selectedRows);
      },
    };
    const popOverContent = (
      <div>
        <Button
          style={{ color: "green" }}
          onClick={() => this.onAccept(selectedRowKeys)}
          type="link"
        >
          Accept
        </Button>
        /
        <Button
          onClick={() => this.onReject(selectedRowKeys)}
          type="link"
          danger
        >
          Reject
        </Button>
      </div>
    );
    return (
      <div className="app-css">
        <h1>
          <BookOutlined /> Contact Information
        </h1>
        <div className="btn-container">
          <span className="action-btn">
            <Popover
              placement="bottomLeft"
              content={popOverContent}
              trigger="click"
            >
              <Button type="primary" icon={<ThunderboltOutlined />}>
                Actions
              </Button>
            </Popover>
          </span>
          <Button shape="round" disabled>
            Selected {selectedRowKeys.length}
          </Button>
        </div>
        <Table
          loading={_.isEmpty(tableData)}
          columns={columns}
          dataSource={tableData}
          rowSelection={rowSelection}
          pagination={false}
        />
      </div>
    );
  }
}

export default App;
