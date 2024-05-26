import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmailVerificationService } from '../email-verification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verifier',
  templateUrl: './email-verifier.component.html',
  styleUrls: ['./email-verifier.component.css']
})
export class EmailVerifierComponent {
  emailForm: FormGroup;
  emailExists: boolean | null = null;
  checkingEmail: boolean = false;
  validEmailsList:any;
  @ViewChild('uploadEmailList') uploadEmailList!: ElementRef;

  constructor(private fb: FormBuilder, private emailVerificationService: EmailVerificationService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.emailForm.get('email');
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }
    this.checkingEmail = true;
    const emailValue = this.emailForm.value.email;
    this.emailVerificationService.verifyEmail(emailValue).subscribe(
      (response: any) => {
        this.emailExists = response.data.status=='valid'?true:false; // Assuming your API returns { exists: boolean }
        this.checkingEmail = false;
      },
      (error) => {
        console.error('Email verification failed:', error);
        this.emailExists = false;
        this.checkingEmail = false;
      }
    );
  }

  uploadEmailListFunc(e: any) {
    const fileList: FileList = e.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);
  
      this.emailVerificationService.verifyListOfEmails(formData).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          this.validEmailsList = response
          this.uploadEmailList.nativeElement.value = '';
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.uploadEmailList.nativeElement.value = '';
        }
      );
    }
  }
}