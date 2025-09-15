
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    private String name;
    private String email;
    private String password;
}