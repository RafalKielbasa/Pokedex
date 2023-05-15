import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchUsers } from "src/api";

const LogInPage = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 10 * (60 * 1000),
  });
  console.log({ users });
  return <div>LogInPage</div>;
};

export default LogInPage;
