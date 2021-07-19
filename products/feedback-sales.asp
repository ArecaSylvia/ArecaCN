<%
Dim fname,email,model_name,continent_country,wechat,business_type,quantity,question,location_href
fname=Request("fname")
email=Request("email")
continent_country=Request("continent_country")
business_type=Request("business_type")
wechat=Request("wechat")
model_name=Request("model_name")
quantity=Request("quantity")
question=Request("question")
location_href=Request("location_href")

body_text="<b>Name = </b>"& fname & "<br>"
body_text = body_text + "<b>Email = </b>"& email & "<br>"
body_text = body_text + "<b>WeChat = </b>"& wechat & "<br>"
body_text = body_text + "<b>Model Name = </b>"& model_name & "<br>"
body_text = body_text + "<b>Continent/Country = </b>"& continent_country & "<br>"
body_text = body_text + "<b>Business Type = </b>"& business_type & "<br>"
body_text = body_text + "<b>Quantity = </b>"& quantity & "<br>"
body_text = body_text + "<b>Question = </b>"& question & "<br>"

confirm_body_text = "Your request has been successfully transmitted. We will reply as soon as possible!<br>"
confirm_body_text = confirm_body_text + "<br>" + body_text


blockName= "https:"
blockName00= "http:"
blockName01= ".ru"
blockName02= "is.gd"
blockName03= "pHq"
blockMail= "yamshanovas@bk.ru"
blockMail00= "{"
blockMail01= "}"
blockMail02= "$"
blockMail03= "email.tst"
blockString01= " Sex "
blockString02= "д"
blockString03= "Ф"

if instr(fname,blockName) or instr(fname,blockName00) or instr(fname,blockName01) or instr(fname,blockName02) or instr(fname,blockName03) or instr(email,blockMail) or instr(email,blockMail00) or instr(email,blockMail01) or instr(email,blockMail02) or instr(email,blockMail03) or instr(dis_model_name,blockName) or instr(motherboard_model,blockName) or instr(dis_model_name,blockName00) or instr(motherboard_model,blockName00) or instr(dis_model_name,blockName01) or instr(motherboard_model,blockName01) or instr(dis_model_name,blockName02) or instr(motherboard_model,blockName02) or instr(question,blockString01) or instr(question,blockString02) or instr(question,blockString03) > 0 then
    response.Redirect "https://www.areca.com.tw/support/contact.asp"

else

	Set plusMail=CreateObject("CDO.Message")
	 plusMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2
	 plusMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "www.areca.com.tw"
	 plusMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25
	 plusMail.Configuration.Fields.Update
	 plusMail.Subject="Sales Inquiry"
	 plusMail.From=email
	 plusMail.To="sales@areca.com.tw;"
	 plusMail.HtmlBody=body_text
	 plusMail.Send
	Set plusMail=Nothing

	Set confirmMail=CreateObject("CDO.Message")
	 confirmMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2
	 confirmMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "www.areca.com.tw"
	 confirmMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25
	 confirmMail.Configuration.Fields.Update
	 confirmMail.Subject="Confirmation letter from Areca"
	 confirmMail.From="sales@areca.com.tw;"
	 confirmMail.To=email
	 confirmMail.HtmlBody=confirm_body_text
	 confirmMail.Send
	Set confirmMail=Nothing

		response.redirect location_href

end if

%>