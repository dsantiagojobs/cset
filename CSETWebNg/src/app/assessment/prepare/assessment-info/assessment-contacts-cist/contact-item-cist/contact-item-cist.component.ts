////////////////////////////////
//
//   Copyright 2022 Battelle Energy Alliance, LLC
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.
//
////////////////////////////////
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AlertComponent } from "../../../../../dialogs/alert/alert.component";
import { EmailComponent } from "../../../../../dialogs/email/email.component";
import { EditableUser } from "../../../../../models/editable-user.model";
import { User } from "../../../../../models/user.model";
import { AssessmentService } from "../../../../../services/assessment.service";
import { AuthenticationService } from "../../../../../services/authentication.service";
import { ConfigService } from "../../../../../services/config.service";
import { EmailService } from "../../../../../services/email.service";

@Component({
  selector: "app-contact-item-cist",
  templateUrl: "./contact-item-cist.component.html",
})
export class ContactItemCistComponent implements OnInit {
  @Input()
  contact: EditableUser;
  @Input()
  enableMyControls: boolean = true;
  @Input()
  contactsList: EditableUser[];
  @Output()
  add = new EventEmitter<EditableUser>();
  @Output()
  create = new EventEmitter<EditableUser>();
  @Output()
  remove = new EventEmitter<boolean>();
  @Output()
  startEditEvent = new EventEmitter<boolean>();
  @Output()
  abandonEditEvent = new EventEmitter<boolean>();
  @Output()
  edit = new EventEmitter<EditableUser>();

  emailDialog: MatDialogRef<EmailComponent>;
  results: EditableUser[];
  editMode: boolean;

  constructor(
    private emailSvc: EmailService,
    public auth: AuthenticationService,
    private assessSvc: AssessmentService,
    private dialog: MatDialog
  ) {
    this.editMode = true;
  }

  ngOnInit() {
    if (this.contact.evaluateCanEdit) {
      this.editMode = this.contact.evaluateCanEdit();
    }
  }

  isEmailValid() {
    // allow blank/null emails as valid
    if (!this.contact.primaryEmail) {
      return true;
    }
    return this.emailSvc.validAddress(this.contact.primaryEmail);
  }

  saveContact() {
    if (this.contact.isNew) {
      if (this.existsDuplicateEmail(this.contact.primaryEmail)) {
        return;
      }

      this.create.emit(this.contact);

      this.contact.isNew = false;
      this.editMode = true;
    } else {
      this.finishEdit();
    }
    return true;
  }

  removeContact() {
    this.remove.emit(true);
  }

  editContact() {
    this.contact.startEdit();
    this.startEditEvent.emit();
    this.editMode = false;
  }

  existsDuplicateEmail(newEmail: string) {
    if (!newEmail) {
      return false;
    }

    for (const c of this.contactsList.filter(item => item !== this.contact)) {
      if ((newEmail !== null || newEmail !== '') && (c.primaryEmail.toUpperCase() === newEmail.toUpperCase())) {
        this.dialog
          .open(AlertComponent, {
            data: { messageText: "This email has already been used. " }
          })
          .afterClosed()
          .subscribe();
        return true;
      }
    }
    return false;
  }

  finishEdit() {
    if (this.existsDuplicateEmail(this.contact.primaryEmail)) {
      return;
    }

    if (this.isEmailValid()) {
      this.contact.endEdit();
      if (!this.contact.isNew) {
        this.edit.emit(this.contact);
      } else {
        this.saveContact();
      }
      this.editMode = true;
    }
  }

  abandonEdit() {
    this.contact.abandonEdit();
    this.abandonEditEvent.emit();
    this.editMode = true;
    if (this.contact.isNew) {
      this.remove.emit(true);
    }
  }

  showControls() {
    if (this.assessSvc.userRoleId === 2 && !this.contact.isFirst) {
      return true;
    }
    return false;
  }

  shouldDisablePrimaryPoc() {
    return !!this.contactsList.find(x => x.isPrimaryPoc) && !this.contact.isPrimaryPoc;
  }
}
