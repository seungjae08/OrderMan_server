module.exports = {
  get: async (req, res) => {
    // 쿠키 목록에서 accessToken 을 지우고
    res.clearCookie("tempToken",{secure:true,sameSite:"none"})
    res.clearCookie("userType",{secure:true, sameSite:"none"})
    res.clearCookie("accessToken",{secure:true,sameSite:"none"})
    res.send("yes");
  },
};
