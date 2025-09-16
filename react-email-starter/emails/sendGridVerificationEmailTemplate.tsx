import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function SendGridVerificationEmailTemplate({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Email Verification - MystryWorld</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your MystryWorld verification code: {otp}</Preview>
      <Section
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "Roboto, Verdana, sans-serif",
        }}
      >
        <Row>
          <Heading
            as="h2"
            style={{
              color: "#333",
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "28px",
              fontWeight: "600",
            }}
          >
            Email Verification
          </Heading>
        </Row>

        <Row>
          <Text
            style={{
              fontSize: "16px",
              color: "#555",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Hello <strong style={{ color: "#007bff" }}>{username}</strong>,
          </Text>
        </Row>

        <Row>
          <Text
            style={{
              fontSize: "16px",
              color: "#555",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Thank you for registering with MystryWorld. Please use the following
            verification code to complete your registration:
          </Text>
        </Row>

        <Row style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              background: "#007bff",
              color: "white",
              padding: "20px",
              borderRadius: "8px",
              fontSize: "32px",
              fontWeight: "bold",
              letterSpacing: "4px",
              display: "inline-block",
              minWidth: "200px",
              textAlign: "center",
              fontFamily: "monospace",
            }}
          >
            {otp}
          </div>
        </Row>

        <Row>
          <Text
            style={{
              fontSize: "14px",
              color: "#666",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            This code will expire in 10 minutes for security reasons.
          </Text>
        </Row>

        <Row>
          <Text
            style={{
              fontSize: "12px",
              color: "#999",
              textAlign: "center",
              marginTop: "40px",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
            }}
          >
            If you did not request this code, please ignore this email.
          </Text>
        </Row>

        <Row style={{ textAlign: "center", marginTop: "30px" }}>
          <Text
            style={{
              fontSize: "12px",
              color: "#999",
            }}
          >
            Best regards,
            <br />
            <strong style={{ color: "#007bff" }}>MystryWorld Team</strong>
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
