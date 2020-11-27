module.exports = {
  get: async (req, res) => {
    // 쿠키 목록에서 accessToken 을 지우고
    res.clearCookie("accessToken").status(200).send("logout success");
  },
};
