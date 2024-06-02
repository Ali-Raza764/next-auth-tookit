import { verifyToken } from "@/actions/user/email-verfication.action";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import VerficationComponent from "./VerficationComponent";

const VerificationPage = async ({ searchParams }) => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }
  const token = searchParams["token"] || "";
  const userId = session.user?.id;

  console.log(token, userId);

  const res = await verifyToken(token, userId);

  console.log(res);

  if(res.status === 200){
    return <VerficationComponent />
  }
  return (
    <div>
      Somthing Went Wrong
    </div>
  );
};

export default VerificationPage;
