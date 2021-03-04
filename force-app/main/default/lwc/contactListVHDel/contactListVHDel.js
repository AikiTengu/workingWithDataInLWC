import { LightningElement, wire} from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import deleteContact from '@salesforce/apex/ContactController.deleteContact';

export default class ContactList extends LightningElement {

    columns = [
        { label: 'First Name', fieldName: FIRSTNAME_FIELD.fieldApiName, type: 'text' },
        { label: 'Second Name', fieldName: LASTNAME_FIELD.fieldApiName, type: 'text' },
        { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' },

        {
            type: 'button-icon',
            fixedWidth: 40,
            typeAttributes: {
                iconName: 'utility:delete',
                name: 'delete_record', 
                title: 'Delete',
                variant: 'border-filled',
                alternativeText: 'delete',
                disabled: false,
            }
        }
    ];


     @wire(getContacts)
     contacts;


    fireDeleteRow(event) {
        let contactId = event.detail.row.Id;

        deleteContact(contactId);
        // console.log(this.contacts.data);
        // console.log("Tuhesfilter at work: " + contactId);
        // let c2 = c2.filter((Contact) => {
        //      return Contact.LastName !== "Caroline";
        //  });

        // console.log(c2.data);

        this.showToast(contactId + " deleted");
    }

    showToast(msg) {
        const evDel = new ShowToastEvent({
            "title": msg,
            "variant": "Success"
             });
        this.dispatchEvent(evDel);
    }

    get errors() {
          return (this.contacts.error) ?
              reduceErrors(this.contacts.error) : [];
      }

}
