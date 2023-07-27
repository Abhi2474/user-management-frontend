import axios from "axios";
import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { read } from "../slice/userSlice";

const UserBoard = () => {
  const usersList = useSelector(state => state.userArray.users)
  const dispatch = useDispatch()

  const fetchData = async (url) => {
    try {
      const { data } = await axios.get(url);
      if (data) {
        dispatch(read(data))
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_DB_URL}`);
    console.log("main fetch");
  }, []);

  const tableHeading = ['id', 'name', 'view', 'update', 'delete']


  return (
    <>
      <table className="min-w-full border divide-y divide-gray-200 mb-40 ">
        <thead className="bg-gray-50">
          <tr>
            {
              tableHeading.map((item, id) => {
                return (
                  <th key={id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {item}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usersList?.map((user) => {
            return <UserCard key={user._id} user={user} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default UserBoard;
