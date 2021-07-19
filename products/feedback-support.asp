<%
Dim fname,email,model_name,question,location_href
fname=Request("fname")
email=Request("email")
model_name=Request("model_name")
question=Request("question")
location_href=Request("location_href")

body_text="<b>Name = </b>"& fname & "<br>"
body_text = body_text + "<b>Email = </b>"& email & "<br>"
body_text = body_text + "<b>Model Name = </b>"& model_name & "<br>"
body_text = body_text + "<b>Details Question = </b>"& question & "<br>"

confirm_body_text = "Your request has been successfully transmitted. We will reply as soon as possible!<br>"
confirm_body_text = confirm_body_text + "<br>" + body_text

Set plusMail=CreateObject("CDO.Message")
 plusMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2
 plusMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "www.areca.com.tw"
 plusMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25
 plusMail.Configuration.Fields.Update
 plusMail.Subject="Ask a Question"
 plusMail.From="simone@areca.com.tw;"
 plusMail.To="simone@areca.com.tw;"
 plusMail.HtmlBody=body_text
 plusMail.Send
Set plusMail=Nothing

Set confirmMail=CreateObject("CDO.Message")
 confirmMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2
 confirmMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "www.areca.com.tw"
 confirmMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25
 confirmMail.Configuration.Fields.Update
 confirmMail.Subject="Confirmation letter from Areca"
 confirmMail.From="simone@areca.com.tw;"
 confirmMail.To=email
 confirmMail.HtmlBody=confirm_body_text
 confirmMail.Send
Set confirmMail=Nothing

	response.redirect location_href

%>