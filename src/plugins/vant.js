import {
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Cell,
  Grid,
  GridItem,
  Icon,
  Search,
  List,
  Form,
  Field,
  CountDown,
} from "vant";
const elements = [
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Cell,
  Grid,
  GridItem,
  Icon,
  Search,
  List,
  Form,
  Field,
  CountDown,
];

export default function (Vue) {
  elements.forEach((item) => Vue.use(item));
}
