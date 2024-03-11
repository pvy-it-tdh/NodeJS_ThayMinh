# JWT là gì ?

JSON WEB TOKEN là một chuẩn mở giúp truyền tải thông tin dưới dạng JSON

## Token là gì ?
> Là một chuỗi ký tự được tạo ra để đại diện cho một đối tượng hoặc quyền truy cập của nó 

Các chuổi JWT có cấu trúc gồm 3 phần : Header, Payload và Signature.
> Header: phần này chứa các thông tin về loại token và thuật toán mã hóa
> Payload: phần này được tạo ra bằng cách dùng thuật toán  HMACSHA256 với nội dung là Base64 encoded Header + Base64 encoded Payload kết hợp một "secret key" (khóa bí mật). 
> Signature: giúp đảm bảo tính toàn vẹn và bảo mật của thông tin trong JWT 

# Access Token là gì 

Với JWT thì người ta phát hiện ra rằng chỉ cần tạo 1 cái token JWT, lưu thông tin người dùng vào như `user_id` hay `role`... rồi gửi cho người dùng, server không cần phải lưu trữ cái token JWT này làm gì. Mỗi lần người dùng request lên server thì gửi cái token JWT này lên, Server chỉ cần verify cái token JWT này là biết được người dùng này là ai, có quyền truy cập tài nguyên hay không.

## Flow xác thực người dùng với Access Token
1.Client gửi request vào tài nguyên được bảo vệ trên server. Nếu client chưa được xác thực, server trả về lỗi 401 Authorization. Client gửi username và password của họ cho server.

2.Server xác minh thông tin xác thực được cung cấp so với cơ sở dữ liệu user. Nếu thông tin xác thực khớp, server tạo ra một JWT chứa payload là user_id (hoặc trường nào đó định danh người dùng). JWT này được gọi là Access Token.

3.Server gửi access token cho client.

4.Client lưu trữ access token ở bộ nhớ thiết bị (cookie, local storage,...).

5.Đối với các yêu cầu tiếp theo, client gửi kèm access token trong header của request.

6.Server verify access token bằng secret key để kiểm tra access token có hợp lệ không.

7.Nếu hợp lệ, server cấp quyền truy cập vào tài nguyên được yêu cầu. Khi người dùng muốn đăng xuất thì chỉ cần xóa access token ở bộ nhớ thiết bị là được.

8.Khi access token hết hạn thì server sẽ từ chối yêu cầu của client, client lúc này sẽ xóa access token ở bộ nhớ thiết bị và chuyển sang trạng thái bị logout.

## Vấn đề của Access Token

Như flow trên thì chúng ta không lưu access token ở trên server, mà lưu ở trên client. Điều này gọi là stateless, tức là server không lưu trữ trạng thái nào của người dùng nào cả.

Khuyết điểm của nó là chúng ta không thể thu hồi access token được. Các bạn có thể xem một số ví dụ dưới đây.

Ví dụ 1: Ở server, chúng ta muốn chủ động đăng xuất một người dùng thì không được, vì không có cách nào xóa access token ở thiết bị client được.

Ví dụ 2: Client bị hack dẫn đến làm lộ access token, hacker lấy được access token và có thể truy cập vào tài nguyên được bảo vệ. Dù cho server biết điều đấy nhưng không thể từ chối access token bị hack đó được, vì chúng ta chỉ verify access token có đúng hay không chứ không có cơ chế kiểm tra access token có nằm trong danh sách blacklist hay không.

Nhưng mà cách này không hay lắm, vì nó sẽ làm cho người dùng bị logout và phải login sau mỗi 5 phút, rất khó chịu về trải nghiệm người dùng.

Lúc này người ta mới nghĩ ra ra một cách để giảm thiểu những vấn đề trên, đó là sử dụng thêm Refresh Token.

# Refresh Token là gì?

Refresh Token là một chuỗi token khác, được tạo ra cùng lúc với Access Token. Refresh Token có thời gian hiệu lực lâu hơn Access Token, ví dụ như 1 tuần, 1 tháng, 1 năm...

Flow xác thực với access token và refresh token sẽ được cập nhật như sau:
1. Client gửi request vào tài nguyên được bảo vệ trên server. Nếu client chưa được xác thực, server trả về lỗi 401 Authorization. Client gửi username và password của họ cho server.
2. Server xác minh thông tin xác thực được cung cấp so với cơ sở dữ liệu user. Nếu thông tin xác thực khớp, server tạo ra 2 JWT khác nhau là Access Token và Refresh Token chứa payload là `user_id `(hoặc trường nào đó định danh người dùng). Access Token có thời gian ngắn (cỡ 5 phút). Refresh Token có thời gian dài hơn (cỡ 1 năm). Refresh Token sẽ được lưu vào cơ sở dữ liệu, còn Access Token thì không.
3. Server trả về access token và refresh token cho client.
4. Client lưu trữ access token và refresh token ở bộ nhớ thiết bị (cookie, local storage,...).
5. Đối với các yêu cầu tiếp theo, client gửi kèm access token trong header của request.
6. Server verify access token bằng secret key để kiểm tra access token có hợp lệ không.
7. Nếu hợp lệ, server cấp quyền truy cập vào tài nguyên được yêu cầu.
8. Khi access token hết hạn, client gửi refresh token lên server để lấy access token mới.
9. Server kiểm tra refresh token có hợp lệ không, có tồn tại trong cơ sở dữ liệu hay không. Nếu ok, server sẽ xóa refresh token cũ và tạo ra refresh token mới với expire date như cũ (ví dụ cái cũ hết hạn vào 5/10/2023 thì cái mới cũng hết hạn vào 5/10/2023) lưu vào cơ sở dữ liệu, tạo thêm access token mới.
10. Server trả về access token mới và refresh token mới cho client.
11. Client lưu trữ access token và refresh token mới ở bộ nhớ thiết bị (cookie, local storage,...).
12. Client có thể thực hiện các yêu cầu tiếp theo với access token mới (quá trình refresh token diễn ra ngầm nên client sẽ không bị logout).
13. Khi người dùng muốn đăng xuất thì gọi API logout, server sẽ xóa refresh token trong cơ sở dữ liệu, đồng thời client phải thực hiện xóa access token và refresh token ở bộ nhớ thiết bị.
14. Khi refresh token hết hạn (hoặc không hợp lệ) thì server sẽ từ chối yêu cầu của client, client lúc này sẽ xóa access token và refresh token ở bộ nhớ thiết bị và chuyển sang trạng thái bị logout.