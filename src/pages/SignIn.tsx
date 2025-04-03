
import Layout from "@/components/layout/Layout";
import SignInComponent from "@/components/auth/SignIn";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <SignInComponent />
      </div>
    </Layout>
  );
};

export default SignInPage;
