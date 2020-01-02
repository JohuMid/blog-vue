import Vue from 'vue';

// 引入导航栏
import {Menu, MenuItem, MenuItemGroup, Submenu} from 'element-ui';

Vue.use(Menu).use(MenuItem).use(MenuItemGroup).use(Submenu)

// 引入按钮
import {Button} from "element-ui";

Vue.use(Button)

// 引入布局
import {Row, Col} from "element-ui";

Vue.use(Row).use(Col)

// 引入图片
import {Image} from "element-ui";

Vue.use(Image)

// 引入头像
import {Avatar} from "element-ui";

Vue.use(Avatar)

// 引入链接
import {Link} from "element-ui";

Vue.use(Link)

// 引入分页器
import {Pagination} from "element-ui";

Vue.use(Pagination)

// Tabs选项卡
import {RadioGroup, RadioButton, Tabs, TabPane} from "element-ui";

Vue.use(RadioGroup).use(RadioButton).use(Tabs).use(TabPane)

// 引入页头
import {PageHeader} from "element-ui";

Vue.use(PageHeader)
// 引入卡片
import {Card} from "element-ui";

Vue.use(Card)
// 引入表单
import {
  Form,
  FormItem,
  Input,
  Select,
  Checkbox,
  CheckboxGroup,
  Radio,
  Switch,
  TimePicker,
  DatePicker,
  Option
} from "element-ui";

Vue.use(Form).use(FormItem).use(Input).use(Select).use(Checkbox).use(CheckboxGroup).use(Radio).use(Switch).use(TimePicker).use(DatePicker).use(Option)

// 引入分割线
import {Divider} from "element-ui";

Vue.use(Divider)

// 引入分割线
import {Popover} from "element-ui";

Vue.use(Popover)
// 引入对话框
import {Dialog} from "element-ui";

Vue.use(Dialog)

// 引入加载
import {Loading} from 'element-ui';

Vue.use(Loading)
// 引入文字提示
import {Tooltip} from 'element-ui';

Vue.use(Tooltip)
// 引入表格
import {Table, TableColumn} from 'element-ui';

Vue.use(Table).use(TableColumn)
// 引入表格
import {Tag} from 'element-ui';

Vue.use(Table).use(Tag)
// 引入回到顶部
import {Backtop} from 'element-ui';

Vue.use(Backtop)
// 引入图标
import {Icon} from 'element-ui';

Vue.use(Icon)
// 标记
import {Badge} from 'element-ui';

Vue.use(Badge)
// 走马灯
import {Carousel,CarouselItem} from 'element-ui';

Vue.use(Carousel).use(CarouselItem)
// 下拉菜单
import {Dropdown,DropdownItem,DropdownMenu} from 'element-ui';

Vue.use(Dropdown).use(DropdownItem).use(DropdownMenu)
// 标记
import {InfiniteScroll} from 'element-ui';

Vue.use(InfiniteScroll)
// 引入级联选择框
import {Cascader} from 'element-ui'

Vue.use(Cascader)
// 引入上传组件
import {Upload} from 'element-ui'

Vue.use(Upload)
// 引入时间线组件
import {Timeline,TimelineItem} from 'element-ui'

Vue.use(Timeline).use(TimelineItem)


import {Message, MessageBox} from "element-ui";


Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;



