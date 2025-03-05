import { useEffect, useState } from "react";
import { List, Card, Pagination, Input, Spin } from "antd";

const { Search } = Input;

interface User {
  _id: string;
  username: string;
  name: string;
  age: number;
}

function SearchUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Items per page

  useEffect(() => {
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
              <Card title={user.name}>
                <p>Username: {user.username}</p>
                <p>Age: {user.age}</p>
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
}

export default SearchUsers;
