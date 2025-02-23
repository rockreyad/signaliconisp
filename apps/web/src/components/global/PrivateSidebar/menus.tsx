import {
  Activity,
  ChartBar,
  ChartLine,
  IdentificationCard,
  Invoice,
  Kanban,
  Lightning,
  User,
  UserGear,
  Users,
} from "@phosphor-icons/react";

const customerMenus = [
  {
    name: "MAIN MENU",
    menuItems: [
      {
        icon: <User size={24} />,
        label: "My Profile",
        route: "/dashboard",
        // children: [{ label: "eCommerce", route: "/" }],
      },
      {
        icon: <Invoice size={24} />,
        label: "Transactions",
        route: "/dashboard/transactions",
      },
      {
        icon: <Lightning size={24} />,
        label: "Recharge",
        route: "/dashboard/recharge",
      },
    ],
  },
];

const rechargeAgentMenus = [
  {
    name: "MAIN MENU",
    menuItems: [
      {
        icon: <User size={24} />,
        label: "My Profile",
        route: "/dashboard",
      },
      {
        icon: <Users size={24} />,
        label: "Customers",
        route: "#",
        children: [
          {
            icon: <User size={24} />,
            label: "All Customers",
            route: "/dashboard/customers",
          },
          {
            icon: <User size={24} />,
            label: "Add Customer",
            route: "/dashboard/customers/add",
          },
        ],
      },
      {
        icon: <Lightning size={24} />,
        label: "Recharge",
        route: "/dashboard/recharge",
      },
      {
        icon: <Invoice size={24} />,
        label: "Transactions",
        route: "/dashboard/transactions",
      },
    ],
  },
];

const adminMenus = [
  {
    name: "MAIN MENU",
    menuItems: [
      {
        icon: <Kanban size={24} />,
        label: "Dashboard",
        route: "/dashboard",
      },
      {
        icon: <Users size={24} />,
        label: "Customers",
        route: "#",
        children: [
          {
            icon: <User size={24} />,
            label: "All Customers",
            route: "/dashboard/customers",
          },
          {
            icon: <User size={24} />,
            label: "Add Customer",
            route: "/dashboard/customers/add",
          },
        ],
      },
      {
        icon: <IdentificationCard size={24} />,
        label: "Agents",
        route: "#",
        children: [
          {
            icon: <UserGear size={24} />,
            label: "All Agents",
            route: "/dashboard/agents",
          },
          {
            icon: <User size={24} />,
            label: "Add Agent",
            route: "/dashboard/agents/add",
          },
        ],
      },
      {
        icon: <Lightning size={24} />,
        label: "Packages",
        route: "#",
        children: [
          {
            icon: <Lightning size={24} />,
            label: "All Packages",
            route: "/dashboard/packages",
          },
          {
            icon: <Lightning size={24} />,
            label: "Add Package",
            route: "/dashboard/packages/add",
          },
        ],
      },
      {
        icon: <Invoice size={24} />,
        label: "Transactions",
        route: "/dashboard/transactions",
      },
      {
        icon: <Lightning size={24} />,
        label: "Recharge",
        route: "/dashboard/recharge",
      },
    ],
  },
  {
    name: "ANALYTICS",
    menuItems: [
      {
        icon: <ChartLine size={24} />,
        label: "Revenue",
        route: "/dashboard/analytics/revenue",
      },
      {
        icon: <ChartBar size={24} />,
        label: "Package Usage",
        route: "/dashboard/analytics/packages",
      },
      {
        icon: <Users size={24} />,
        label: "User Growth",
        route: "/dashboard/analytics/users",
      },
      {
        icon: <Activity size={24} />,
        label: "Agent Performance",
        route: "/dashboard/analytics/agents",
      },
    ],
  },
];

const menus = {
  CUSTOMER: customerMenus,
  RECHARGE_AGENT: rechargeAgentMenus,
  ADMIN: adminMenus,
};

export default menus;
