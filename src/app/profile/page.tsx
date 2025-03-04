import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>user profile</h1>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  text: {
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default ProfilePage;
