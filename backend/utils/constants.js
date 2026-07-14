const userResponse = (user) => ({
  id: user._id,
  username: user.username,
  role: user.role,
  companyId: user.companyId,
  status: user.status,
});

export default userResponse;