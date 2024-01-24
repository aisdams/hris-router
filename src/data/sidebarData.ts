import { BiBox } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { GoClock } from 'react-icons/go';
import { LuTicket } from 'react-icons/lu';
import { TbBrandSnowflake } from 'react-icons/tb';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { RiGraduationCapLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiWallet, CiGrid41, CiGrid31 } from 'react-icons/ci';
import { IoDocumentText, IoSettingsOutline } from 'react-icons/io5';
import { FaRegCircle, FaRegUser, FaUserPlus } from 'react-icons/fa';
import { MdOutlineDateRange, MdOutlineVideocam, MdHome } from 'react-icons/md';
import { HiOutlineClipboardDocumentList, HiOutlineDocument } from 'react-icons/hi2';

const sideBarData = [
  {
    title: 'Dashboard',
    icon: MdHome,
    sub: [
      {
        title: 'Overview',
        link: '/',
      },
      {
        title: 'Reports',

        submenu: [
          {
            title: 'Manage-Income',
            link: '/report/income-expense',
          },
          {
            title: 'Monthly Attendance',
            link: '/report/monthly-attendance',
          },
          {
            title: 'Leave',
            link: '/report/leave',
          },
          {
            title: 'Account Statement',
            link: '/report//account-statement',
          },
          {
            title: 'Payroll',
            link: '/report/payroll',
          },
          {
            title: 'Timesheet',
            link: '/report/timesheet',
          },
        ],
      },
    ],
  },
  {
    title: 'Staff',
    icon: FiUsers,
    sub: [
      {
        title: 'Users',
        link: '/staff/user',
      },
      {
        title: 'Role',
        link: '/staff/role',
      },
      {
        title: 'Employee Profile',
        link: '/staff/employee-profile',
      },
    ],
  },
  {
    title: 'Employee',
    link: '/employee',
    icon: FaRegUser,
  },
  {
    title: 'Payroll',
    icon: IoDocumentText,
    sub: [
      {
        title: 'Set Salery',
        link: '/payroll/set-salary',
      },
      {
        title: 'Payslip',
        link: '/payroll/payslip',
      },
    ],
  },
  {
    title: 'Timesheet',
    icon: GoClock,
    sub: [
      {
        title: 'Timesheet',
        link: '/timesheet/sec',
      },
      {
        title: 'Manage Leave',
        link: '/timesheet/leave',
      },
      {
        title: 'Attendance',

        submenu: [
          {
            title: 'Attendance',
            link: '/timesheet/attendance/marked-attendance',
          },
          {
            title: 'Bulk Attendance',
            link: '/timesheet/attendance/bulkattendance',
          },
        ],
      },
    ],
  },
  {
    title: 'Perfomance',
    icon: BiBox,
    sub: [
      {
        title: 'Indicator',
        link: '/perfomance/indicator',
      },
      {
        title: 'Appraisal',
        link: '/perfomance/appraisal',
      },
      {
        title: 'Goal Tracking',
        link: '/perfomance/goal-tracking',
      },
    ],
  },
  {
    title: 'Finance',
    icon: CiWallet,
    sub: [
      {
        title: 'Account List',
        link: '/finance/accountlist',
      },
      {
        title: 'Account Balances',
        link: '/finance/account-balance',
      },
      {
        title: 'Payees',
        link: '/finance/payees',
      },
      {
        title: 'Payers',
        link: '/finance/payers',
      },
      {
        title: 'Deposite',
        link: '/finance/deposit',
      },
      {
        title: 'Expense',
        link: '/finance/expense',
      },
      {
        title: 'Transfer Balance',
        link: '/finance/transfer-balance',
      },
    ],
  },
  {
    title: 'Training',
    icon: RiGraduationCapLine,
    sub: [
      {
        title: 'Training List',
        link: '/training',
      },
      {
        title: 'Trainer',
        link: '/training/trainer',
      },
    ],
  },
  {
    title: 'HR Admin Setup',
    icon: FaUserPlus,
    sub: [
      {
        title: 'Award',
        link: '/hr-admin/award',
      },
      {
        title: 'Transfer',
        link: '/hr-admin/transfer',
      },
      {
        title: 'Resignation',
        link: '/hr-admin/resignation',
      },
      {
        title: 'Trip',
        link: '/hr-admin/travel',
      },
      {
        title: 'Promotion',
        link: '/hr-admin/promotion',
      },
      {
        title: 'Complaints',
        link: '/hr-admin/complaints',
      },
      {
        title: 'Warning',
        link: '/hr-admin/warning',
      },
      {
        title: 'Termination',
        link: '/hr-admin/termination',
      },
      {
        title: 'Announcement',
        link: '/hr-admin/announcement',
      },
      {
        title: 'Holidays',
        link: '/hr-admin/holidays',
      },
    ],
  },
  {
    title: 'Recruitment',
    icon: HiOutlineClipboardDocumentList,
    sub: [
      {
        title: 'Job',
        link: '/recruitment/job',
      },
      {
        title: 'Job Create',
        link: '/recruitment/job/create',
      },
      {
        title: 'Job Application',
        link: '/recruitment/job-application',
      },
      {
        title: 'Job Candidate',
        link: '/recruitment/job-candidates',
      },
      {
        title: 'Job On-Boarding',
        link: '/recruitment/job-onboard',
      },
      {
        title: 'Custom Question',
        link: '/recruitment/custom-question',
      },
      {
        title: 'Interview Schedule',
        link: '/recruitment/interview-schedule',
      },
      {
        title: 'Careear',
        link: '/recruitment/careear',
      },
    ],
  },
  {
    title: 'Contracts',
    icon: HiOutlineClipboardDocumentList,
    link: '/contract',
  },
  {
    title: 'Ticket',
    icon: LuTicket,
    link: '/ticket',
  },
  {
    title: 'Event',
    icon: MdOutlineDateRange,
    link: '/event',
  },
  {
    title: 'Meeting',
    icon: MdOutlineDateRange,
    link: '/meeting',
  },
  {
    title: 'Zoom Meeting',
    icon: MdOutlineVideocam,
    link: '/zoom-meeting',
  },
  {
    title: 'Assets',
    icon: TbBrandSnowflake,
    link: '/assets',
  },
  {
    title: 'Document',
    icon: TbBrandSnowflake,
    link: '/document',
  },
  {
    title: 'Email Templates',
    icon: CiGrid31,
    link: '/email_template_lang',
  },
  {
    title: 'Company Policy',
    icon: CiGrid31,
    link: '/company-policy',
  },
  {
    title: 'Messenger',
    icon: CiGrid31,
    link: '/chats',
  },
  {
    title: 'Notification Templates',
    icon: IoMdNotificationsOutline,
    link: '/notification-templates',
  },
  {
    title: 'HRM System Setup',
    icon: CiGrid41,
    link: '/branch',
  },
  {
    title: 'Landing Page',
    icon: HiOutlineDocument,
    link: '/landingpage',
  },
  {
    title: 'System Setting',
    icon: IoSettingsOutline,
    link: '/settings',
  },
];

export default sideBarData;
