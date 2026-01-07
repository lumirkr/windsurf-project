import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignIn 
        appearance={{
          elements: {
            footerActionLink: 'hidden',
            footerAction: 'hidden',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden',
          },
        }}
        afterSignInUrl="/"
        afterSignUpUrl="/"
      />
    </div>
  );
}
