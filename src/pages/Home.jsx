import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import UserList from "../components/UserLIst";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  console.log(currentUser);
  useEffect(() => {
    const users = ref(database, "users");
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      let users = Object.entries(data).map((user) => {
        return {
          userid: user[0],
          ...user[1],
        };
      });
      setUsers(users);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Header />
      <section>
        <div className="user-lists">
          {loading ? (
            <h4 className="text-center mt-5">loading</h4>
          ) : (
            users.map((user) => {
              if (currentUser.email === user.email) return;
              return <UserList key={user.userid} {...user} />;
            })
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
