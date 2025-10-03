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

export default function ForgotPasswordOtpEmailTemplate({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Password Reset OTP</title>
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

      {/* Preview text — shown in email inbox */}
      <Preview>You requested a password reset. Your OTP is: {otp}</Preview>

      <Section style={{ padding: "20px", fontFamily: "Roboto, Verdana" }}>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>

        <Row>
          <Text>
            You have requested to reset your password. Please use the following
            One-Time Password (OTP) to proceed:
          </Text>
        </Row>

        <Row>
          <Heading as="h1" style={{ color: "#007BFF" }}>
            {otp}
          </Heading>
        </Row>

        <Row>
          <Text>
            This OTP will expire in 5 minutes for security reasons. If you did
            not request this, please ignore this email.
          </Text>
        </Row>

        {/* Optional button link for verification page */}
        {/* <Row>
          <Button
            href={`http://localhost:3000/reset-password/${username}`}
            style={{ backgroundColor: "#007BFF", color: "#ffffff" }}
          >
            Reset Password
          </Button>
        </Row> */}
      </Section>
    </Html>
  );
}
