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
/* 添加角色 */
export const saveRole = data => {
  return request({
    method: 'POST',
    url: '/role/roleAdd',
    data: qs.stringify(data),
  });
};
/* 修改角色 */
export const updateRole = data => {
  return request({
    method: 'POST',
    url: '/role/roleEdit',
    data: qs.stringify(data),
  });
};
/* 修改角色 */
export const delRole = data => {
  return request({
    method: 'POST',
    url: '/role/roleDel',
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
/* 获取和设置角色权限 */
export const bindRole = data => {
  return request({
    method: 'POST',
    url: '/role/giveAccess',
    data: qs.stringify(data),
  });
};
/* 删除管理员 */
export const userdel = data => {
  return request({
    method: 'POST',
    url: '/user/userdel',
    data: qs.stringify(data),
  });
};
/* 修改管理员 */
export const useredit = data => {
  return request({
    method: 'POST',
    url: '/user/useredit',
    data: qs.stringify(data),
  });
};
/* 节点列表 */
export const getNodeList = data => {
  return request({
    method: 'POST',
    url: '/node/index',
    data: qs.stringify(data),
  });
};
/* 添加节点 */
export const saveNode = data => {
  return request({
    method: 'POST',
    url: '/node/nodeadd',
    data: qs.stringify(data),
  });
};
/* 删除节点 */
export const delNode = data => {
  return request({
    method: 'POST',
    url: '/node/nodedel',
    data: qs.stringify(data),
  });
};
/* 修改节点 */
export const updateNode = data => {
  return request({
    method: 'POST',
    url: '/node/nodeedit',
    data: qs.stringify(data),
  });
};