import Profile from '../common/Profile';

const FamilyList = () => {
  return (
    <div className="mt-5 flex h-fit w-full items-center gap-5">
      {/* My Profile */}
      <Profile
        type="image"
        src="https://i.pinimg.com/474x/ea/1b/97/ea1b97933b857a77aab7f5a5e20b4b2e.jpg"
        userName="나"
        userRole="딸"
        isText
      />
      <div className="h-16 border-l-2 border-gray-30" />
      {/* Family Profiles */}
      <Profile userName="형만쓰" userRole="아빠" isText />
      <Profile
        type="image"
        src="https://i.pinimg.com/474x/9b/13/21/9b1321305fa5e0908f13ffdd46b0e8dc.jpg"
        userName="개똥맘"
        userRole="엄마"
        isText
      />
      <Profile
        type="image"
        src="https://i.pinimg.com/474x/99/c7/88/99c78895efebd80b3bbb9c1649fdfe4f.jpg"
        userName="삐삐"
        userRole="아들"
        isText
      />
    </div>
  );
};

export default FamilyList;
