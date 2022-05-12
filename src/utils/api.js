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
/* 所有用户 */
export const getAllMember = data => {
  return request({
    method: 'POST',
    url: '/support/all_member',
    data: qs.stringify(data),
  });
};
/* 公海池 */
export const getPubMember = data => {
  return request({
    method: 'POST',
    url: '/support/pub_member',
    data: qs.stringify(data),
  });
};
/* 组长池 */
export const getGroMember = data => {
  return request({
    method: 'POST',
    url: '/support/gro_member',
    data: qs.stringify(data),
  });
};
/* 个人池 */
export const getPerMember = data => {
  return request({
    method: 'POST',
    url: '/support/per_member',
    data: qs.stringify(data),
  });
};
/* 释放 */
export const releaseMember = data => {
  return request({
    method: 'POST',
    url: '/support/memberrelease',
    data: qs.stringify(data),
  });
};
/* 拉取 */
export const supMember = data => {
  return request({
    method: 'POST',
    url: '/support/membersup',
  });
};
/* 添加管理员 */
export const useradd = data => {
  return request({
    method: 'POST',
    url: '/user/useradd',
    data: qs.stringify(data),
  });
};
/* 查看操作记录 */
export const getLogList = data => {
  return request({
    method: 'POST',
    url: '/support/runlog',
    data: qs.stringify(data),
  });
};
/* 设置备注 */
export const setRemark = data => {
  return request({
    method: 'POST',
    url: '/support/set_remark',
    data: qs.stringify(data),
  });
};