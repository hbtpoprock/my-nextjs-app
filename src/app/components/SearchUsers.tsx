import { useEffect, useState } from "react";
import { List, Card, Pagination, Input, Spin, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateUserForm from "./UpdateUserForm";
import DeleteUserForm from "./DeleteUserForm";

const { Search } = Input;

interface User {
  _id: string;
  username: string;
  name: string;
  age: number;
}

const SearchUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Items per page

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Track the selected userId

  const showUpdateModal = (userId: string) => {
    setIsUpdateModalVisible(true);
    setSelectedUserId(userId); // Set the userId for the selected user
  };

  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setSelectedUserId(null); // Reset selected user ID
  };

  const showDeleteModal = (userId: string) => {
    setIsDeleteModalVisible(true);
    setSelectedUserId(userId); // Set the userId for the selected user
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSelectedUserId(null); // Reset selected user ID
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search-users?query=${query}&page=${page}&limit=${limit}`
      );

      const result = await response.json();
      setUsers(result.data);
      setTotal(result.totalItems);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [query, page, limit]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <Search
        placeholder="Search users"
        enterButton="Search"
        onSearch={handleSearch}
        style={{ marginBottom: 20 }}
      />
      {loading ? (
        <Spin tip="Loading users..." fullscreen />
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={users}
          renderItem={(user) => (
            <List.Item>
              <Card title={`Username: ${user.username}`}>
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <Button
                  type="primary"
                  onClick={() => showUpdateModal(user._id)}
                  style={{ background: "#BA8E23" }}
                  icon={<EditOutlined />}
                ></Button>
                <Button
                  type="primary"
                  danger={true}
                  onClick={() => showDeleteModal(user._id)}
                  icon={<DeleteOutlined />}
                ></Button>
                {selectedUserId === user._id && (
                  <UpdateUserForm
                    visible={isUpdateModalVisible}
                    onClose={closeUpdateModal}
                    userId={user._id}
                    onUserUpdated={fetchUsers} // Pass fetchUsers here
                  />
                )}
                {selectedUserId === user._id && (
                  <DeleteUserForm
                    visible={isDeleteModalVisible}
                    onClose={closeDeleteModal}
                    userId={user._id}
                    onUserDeleted={fetchUsers} // Pass fetchUsers here
                  />
                )}
              </Card>
            </List.Item>
          )}
        />
      )}
      <Pagination
        current={page}
        pageSize={limit}
        total={total}
        onChange={handlePageChange}
        style={{ marginTop: 20, textAlign: "center" }}
      />
    </div>
  );
};

export default SearchUsers;
