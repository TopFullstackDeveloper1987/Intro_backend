import { Types } from 'mongoose';
import { superPermissionId } from '../config';
import { Request, SidebarItem } from '../types';
import { ISidebar } from '../models';

export const getRandomDigit = (): number => {
  const a = new Date().valueOf().toString();
  return Number(a.slice(a.length - 1 - 7, a.length - 1));
};

export const getAccessIpAddress = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'] as string;
  const ips = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;
  const ip =
    ips && ips.length > 0 && ips.indexOf(',') ? ips.split(',')[0] : null;
  return ip;
};

export const listToTree = (list: ISidebar[], sort = false): SidebarItem[] => {
  let i;
  let node: any;
  const map: { [key: number]: number } = {};
  const roots: SidebarItem[] = [];
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.pid !== 0) {
      if (list[map[node.pid]]) {
        list[map[node.pid]].children.push(
          sort
            ? node.children.length
              ? {
                  icon: node.icon,
                  path: node.navLink,
                  title: node.title,
                  children: node.children
                }
              : {
                  icon: node.icon,
                  path: node.navLink,
                  title: node.title
                }
            : node
        );
        // return;
      } else {
        // return;
      }
      // if you have dangling branches check that map[node.parentId] exists
    } else {
      roots.push(
        sort
          ? node.children.length
            ? {
                icon: node.icon,
                path: node.navLink,
                title: node.title,
                children: node.children
              }
            : {
                icon: node.icon,
                path: node.navLink,
                title: node.title
              }
          : node
      );
    }
  }
  return roots;
};

export const isSuperAdmin = (id: string): boolean => {
  const superadmins = [superPermissionId];
  if (superadmins.indexOf(String(id)) == -1) {
    return false;
  } else {
    return true;
  }
};

export const objectId = (id: string): Types.ObjectId => {
  return new Types.ObjectId(id);
};
