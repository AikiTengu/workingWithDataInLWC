import { LightningElement, wire } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
const COLUMNS = [
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
            onclick: ()=> {
               console.log("deleted");
            }
        },
    }
];


export default class ContactList extends LightningElement {
     columns = COLUMNS; 
     @wire(getContacts)
     contacts;

 

    get errors() {
          return (this.contacts.error) ?
              reduceErrors(this.contacts.error) : [];
      }

}
