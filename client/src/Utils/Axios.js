
import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? 'api/v1/' : 'http://localhost:5000/api/v1/'

  const Axios=axios.create({
    baseURL ,
})
export default Axios;




// const { userAuth, setUserAuth } = useContext(AuthUser);
// const [loading, setLoading] = useState(true);

// const refreshToken = async () => {
//   try {
//     const res = await axios.post("/auth/refresh", {
//       token: userAuth.refreshToken,
//     });
//     console.log(res,"resssssssss");
//     setUserAuth({
//       ...userAuth,
//       accessToken: res.data.accessToken,
//       refreshToken: res.data.refreshToken,
//     });
//     return res.data;
//   } catch (err) {
//     console.log(err, "errrrrrrrr");
//   }
// };

// useEffect(() => {
//   let currentDate = new Date();
//   const decodedToken = jwtDecode(userAuth.accessToken);
//   decodedToken.exp * 1000 < currentDate.getTime()
//     ? refreshToken()
//     : setLoading(false);
// }, []);

// return <>{loading ? <h1>is Loading...</h1> : <Outlet />}</>;


