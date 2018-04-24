export class AppSettings {
  public static url: String = "http://3.209.196.136:9090/"; //192.168.0.102 //agile-wildwood-25315.herokuapp.com
  public static userName: String = localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "";
  public static userEmail: String = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "";
}

