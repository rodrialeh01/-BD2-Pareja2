import FormLogin from "../../components/FormLogin";
const Login = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2 bg-azullog">
                <FormLogin />
            </div>
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200 bg-cover" style={{ backgroundImage: 'url("http://imgfz.com/i/ribUkHe.jpeg")' }}>
                <div className="w-60 h-60 animate-bounce">
                    <img src="http://imgfz.com/i/pLD1i4n.png" alt="cruz" />
                </div>
            </div>
        </div>
    );
}

export default Login;