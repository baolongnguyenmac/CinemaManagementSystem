# Cinema Management System  

- Teamwork với mấy nhóc học Công nghệ phần mềm HCMUS  
- Thông tin thành viên nhóm:  
  - Nguyễn Bảo Long - 18120201  
  - Võ Thế Minh - 18120211  
  - Phạm Văn Minh Phương - 18120227  
  - Phạm Tống Bình Minh - 18120210  
  - Nguyễn Duy Vũ - 18120264  
- Thông tin liên hệ: baolongnguyen.mac@gmail.com  

## Mô tả đề tài  

- 3 actors: Admin, Quản lý, Người dùng  
- Dữ liệu cần quản lý: Thông tin của Người dùng, Thông tin của Quản lý, Thông tin của Admin, Thông tin phim và lịch chiếu, Thông tin vé (bao gồm người bán, người mua, chỗ ngồi, giá vé)  
- Các chức năng dự định cho Người dùng  
  - Đăng ký/Đăng nhập/Đăng xuất tài khoản  
  - Đặt/Huỷ vé  
  - Xem lịch chiếu  
  - Thanh toán online qua Momo  
- Các chức năng dự định cho Quản lý:  
  - Đăng nhập/Đăng xuất tài khoản do Admin cấp  
  - Thêm/Xoá/Sửa lịch chiếu  
  - Thêm/Xoá/Sửa các chương trình khuyến mãi  
- Các chức năng dự định cho Admin:  
  - Thêm/Xoá/Sửa Quản lý  
  - Thống kê doanh thu theo phim/ngày/tháng/năm  

## Clone về máy và chạy thử

- Yêu cầu công nghệ để chạy thử web
  - Cài đặt NodeJS
  - Cài đặt MongoDB (cần cài thêm phần mềm GUI thao tác với data: MongoDB Compass)
    - Tạo database `NMCNPM` (xem trong file `./Source/user-guest/code/config/key.js` để biết chi tiết)
    - Tạo các collection có tên trùng với tên file trong thư mục `./Source/user-guest/database` (Ví dụ file `films.json` sẽ tương ứng với collection `films`)
    - Import file `*.json` vào từng collection vừa tạo

- Khởi chạy server trang web
  - Đi tới đường dẫn `./Source/user-guest/code`
  - Chạy lệnh `node app.js`
  - Lúc này sẽ có một thông báo xuất hiện trên console cho biết số port mà server đang lắng nghe người dùng connect (cụ thể là port 8080 và có thể được đổi lại trong file `app.js`)
  - Mở trình duyệt và truy cập vào đường dẫn `http://localhost:8080`

## Công nghệ được sử dụng trong đồ án

- Phía Front-end
  - Sử dụng HTML/CSS/JS để code giao diện (phần lớn là copy code trên [https://bootsnipp.com/](https://bootsnipp.com/))
  - Sử dụng jQuery để truy vấn

- Phía back-end
  - Quản lý server: Sử dụng `NodeExpress`
  - View engine: `ejs` (cho phép người dùng insert code JS vào đoạn code HTML)
  - Xác thực tài khoản: Sử dụng thư viện PassportJS
  - API sử dụng trong đồ án
    - Quản lý hóa đơn + Thanh toán: `PayPal/rest/API` (tuy nhiên, việc thanh toán chỉ được thực hiện bằng tài khoản [sandbox](https://developer.paypal.com/developer/accounts/))
    - Upload và lưu trữ ảnh đại diện: sử dụng API `Bootstrap File Input` - Tác giả Krajee (thực ra nó sử dụng giao thức FTP ở phần lõi thôi)

## Các chức năng đã hoàn thành

- Định nghĩa thang trọng số
  - 1: Ưu tiên rất cao
  - 2: Ưu tiên cao
  - 3: Ưu tiên trung bình
  - 4: Ưu tiên thấp

- Bảng các chức năng đã hoàn thành

| ID   | Trọng số | Yêu cầu chức năng                                                                                                                              | Hoàn thành                                      |
| :--: | :------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------: |
| 1\.1 | 2        | Hệ thống sẽ cho phép *khách hàng của rạp phim* **Đăng ký** tài khoản của họ                                                                    | x                                               |
| 1\.2 | 2        | Hệ thống sẽ cho phép *khách hàng của rạp phim* **Đăng nhập** tài khoản của họ                                                                  | x                                               |
| 1\.3 | 2        | Hệ thống sẽ cho phép *khách hàng của rạp phim* **Đăng xuất** tài khoản của họ                                                                  | x                                               |
| 1\.4 | 1        | Hệ thống sẽ cho phép *khách hàng của rạp phim* **Đặt vé xem phim**                                                                             | x                                               |
| 1\.5 | 2        | Hệ thống sẽ cho phép *khách hàng của rạp phim* **Huỷ vé xem phim** (chỉ huỷ <br>  được trong TH đã đặt vé trước đó)                            | Được đổi thành chức năng **Xem lịch sử mua vé** |
| 1\.6 | 1        | Hệ thống sẽ cho phép *khách hàng của rạp phim* **Xem thông tin phim** <br> (lịch chiếu, chương trình khuyến mãi)                               | x                                               |
| 1\.7 | 2        | Hệ thống sẽ cho phép *khách hàng của rạp phim* **Thanh toán** vé đã đặt online <br>  **qua ví điện tử Momo**                                   | x                                               |
| 2\.1 | 2        | Hệ thống sẽ cho phép *quản lý của rạp phim* **Đăng nhập** tài khoản do *admin* cấp                                                             | x                                               |
| 2\.2 | 2        | Hệ thống sẽ cho phép *quản lý của rạp phim* **Đăng xuất** tài khoản do *admin* cấp                                                             | x                                               |
| 2\.3 | 1        | Hệ thống sẽ cho phép *quản lý của rạp phim* **Quản lý thông tin phim** trong rạp                                                               | x                                               |
| 2\.4 | 4        | Hệ thống sẽ cho phép *quản lý của rạp phim* **Quản lý các chương trình** <br>  **khuyến mãi** trong rạp                                        |                                                 |
| 3\.1 | 2        | Hệ thống sẽ cho phép *admin* **Đăng nhập** tài khoản của họ                                                                                    | x                                               |
| 3\.2 | 2        | Hệ thống sẽ cho phép *admin* **Đăng xuất** tài khoản của họ                                                                                    | x                                               |
| 3\.3 | 3        | Hệ thống sẽ cho phép *admin* **Quản lý các quản lý** trong rạp                                                                                 | x                                               |
| 3\.4 | 4        | Hệ thống sẽ cho phép *admin* **Thực hiện các thống kê về doanh thu** theo <br> phim, ngày, tháng, năm                                          | x                                               |

## Demo
