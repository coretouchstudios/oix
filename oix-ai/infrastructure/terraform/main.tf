provider "aws" {
 region = "us-east-1"
}

resource "aws_instance" "oix_server" {

 ami           = "ami-123456"
 instance_type = "t3.medium"

 tags = {
  Name = "OIX-Server"
 }

}
