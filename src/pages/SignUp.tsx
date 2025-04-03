
import Layout from "@/components/layout/Layout";
import SignUpComponent from "@/components/auth/SignUp";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const SignUpPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <SignUpComponent />
      </div>
    </Layout>
  );
};

export default SignUpPage;
