import { ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'src/app/services/toaster.service';
import { Utility } from 'src/app/utility/Utility';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() toShow !: boolean;
  @Input() isValidPassword !: boolean;
  @ViewChild('modal') modalRef !: ElementRef;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter;
  @Output() checkPassword: EventEmitter<string> = new EventEmitter;
  @Output() updatePassword: EventEmitter<string> = new EventEmitter;
  editPassword !: FormGroup;
  instance: any;

  constructor(private ngbModal: NgbModal, private cdr: ChangeDetectorRef, private _toast: ToasterService) {
    this.editPassword = new FormGroup({
      oldPassword: new FormControl('', [Validators.required],),
      password: new FormControl({ value: '', disabled: !this.isValidPassword }, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl({ value: '', disabled: !this.isValidPassword }, [Validators.required, Validators.minLength(8)])
    })
    this.editPassword.addValidators(Utility.confirmPasswordValidator(this.editPassword));
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.toShow && !this.ngbModal.hasOpenModals())
      this.instance = this.ngbModal.open(this.modalRef, {
        backdrop: false,
        keyboard: false
      });
  }

  onSave() {
    if (this.editPassword.valid && this.isValidPassword) {
      if (this.getControl('password', 'value').trim().toLowerCase() != this.getControl('confirmPassword', 'value').trim().toLowerCase()) {
        this.updatePassword.emit(this.editPassword.get('password')?.value);
        this.closeModal();
      } else {
        this._toast.show('Password cannot be same as current password', { classname: "bg-danger text-light", delay: 2000 })
      }
    }
  }

  closeModal() {
    this.ngbModal.dismissAll();
    this.closeModalEvent.emit();
    this.editPassword.reset();
  }

  validatePassword(event: any) {
    var password = this.editPassword.get('oldPassword')?.value;
    this.checkPassword.emit(password);
  }

  getControl(controlName: string, controlType: string) {
    if (controlType == 'touched')
      return this.editPassword.controls[controlName].touched;
    else if (controlType == 'value')
      return this.editPassword.controls[controlName]?.value;
    return false;
  }

  getErrorControl(controlName: string, controlType: string): boolean {
    if (controlType == 'required')
      return this.editPassword.controls[controlName].errors?.required;
    else if (controlType == 'min-length')
      return this.editPassword.controls[controlName].errors?.minlength;
    return false;
  }

  showPassword(ref: HTMLInputElement) {
    ref.type = ref.type === 'password' ? 'text' : 'password';
  }
}
