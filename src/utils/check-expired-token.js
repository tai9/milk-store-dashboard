import JwtDecode from 'jwt-decode';

export default function checkExpiredToken(token) {
    if (!token) return true;

    const tokenInfo = JwtDecode < { exp: Date } > token;
    const tokenExpired = new Date(tokenInfo.exp);
    const todayTime = new Date();
    return tokenExpired < todayTime;
}
