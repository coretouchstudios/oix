export const roles={
ADMIN:"admin",
DEVELOPER:"developer",
OPERATOR:"operator",
VIEWER:"viewer"
}
export const permissions={
admin:["users.manage","workflows.manage","plugins.install","cluster.manage"],
developer:["workflows.create","nodes.create","plugins.publish"],
operator:["workflows.run","monitoring.view"],
viewer:["dashboard.view"]
}
