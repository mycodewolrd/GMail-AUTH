/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserProfilePage({ params }: any) {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h3 className="text-3xl p-6  rounded-xl">
        Hi, welcome to your profile page👋 
      </h3>
      <h4 className="py-3 mx-4 text-black font-bold px-6 bg-orange-500 rounded-md">
        {params.id}
      </h4>
    </div>
  );
}
