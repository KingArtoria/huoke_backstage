import request from './request';
import qs from 'qs';
/* 登录 */
export const dologin = data => {
  return request({
    method: 'POST',
    url: '/login/dologin',
    data: qs.stringify(data),
  });
};
/* 角色列表 */
export const getRoleList = data => {
  return request({
    method: 'POST',
    url: '/role/index',
    data: qs.stringify(data),
  });
};
/* 管理员列表 */
export const getUserList = data => {
  return request({
    method: 'POST',
    url: '/user/index',
    data: qs.stringify(data),
  });
};