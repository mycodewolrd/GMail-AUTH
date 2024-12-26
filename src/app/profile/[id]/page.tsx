/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function UserProfilePage({ params }: any) {
  const solvedParams = await params;
  const { id } = solvedParams;
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h3 className="text-3xl p-6  rounded-xl">
        Hi, welcome to your profile page👋 
      </h3>
      <h4 className="py-3 mx-4 text-white font-bold text-3xl px-6 bg-orange-500 rounded-md">
        {id}
      </h4>
    </div>
  );
}
