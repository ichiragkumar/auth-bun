



import { loginUser} from "../controllers/user.ts";
import { registerUser} from "../controllers/user.ts";
import { getProfile} from "../controllers/user.ts";
import { sendOtpEmail} from "../controllers/user.ts";
import { sendOtpSms} from "../controllers/user.ts";
import { verifyOtp} from "../controllers/user.ts";
import { signupUser} from "../controllers/user.ts";
import { getMe} from "../controllers/user.ts";





export default {
    loginUser,  
    registerUser,
    getProfile,
    sendOtpEmail,
    sendOtpSms,
    verifyOtp,
    signupUser,
    getMe
}