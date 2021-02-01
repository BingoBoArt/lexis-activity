/**
 * 加密手机号码(中间四位变成*)
 * @param  {Number} timestamp 时间戳
 * @param  {String} format    格式化类型
 * @return {String}
 */
export default function encryption(phoneNumber) {
  return (phoneNumber = phoneNumber.replace(/(\w{3})\w*(\w{4})/, "$1****$2"));
}
