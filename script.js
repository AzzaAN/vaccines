/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
const NS = 'org.example.empty';


/**
 * create an order to purchase
 * @param {org.example.empty.RecAccessToHospital} purchase - the order to be processed
 * @transaction
 */
async function RecAccessToHospital(data) {
    data.vaccineRecord.hospital = data.hospital; 
    const assetRegistry = await getAssetRegistry(NS+'.VaccineRecord');
  
    await assetRegistry.update(data.vaccineRecord);
  }

/**
 * create an order to purchase
 * @param {org.example.empty.RecAccessToInsurance} purchase - the order to be processed
 * @transaction
 */
async function RecAccessToInsurance(data) {
    data.vaccineRecord.insurance = data.insurance; 
    const assetRegistry = await getAssetRegistry(NS+'.VaccineRecord');
  
    await assetRegistry.update(data.vaccineRecord);
  }

/**
 * create an order to purchase
 * @param {org.example.empty.RecAccessToSchool} purchase - the order to be processed
 * @transaction
 */
async function RecAccessToSchool(data) {
    data.vaccineRecord.school = data.school; 
    const assetRegistry = await getAssetRegistry(NS+'.VaccineRecord');
  
    await assetRegistry.update(data.vaccineRecord);
  }

/**
 * create an order to purchase
 * @param {org.example.empty.DocNote} purchase - the order to be processed
 * @transaction
 */
async function DocNote(data) {
  data.detail.note = data.note; 
    const assetRegistry = await getAssetRegistry(NS+'.VaccineDetail');
  
    await assetRegistry.update(data.detail);
  }

/**
 * create an order to purchase
 * @param {org.example.empty.PhysicianSignature} purchase - the order to be processed
 * @transaction
 */
async function PhysicianSignature(data) {
   if(!data.detail.note){
       throw new Error("The Vaccine Detail cannot be singed without a Doctor's Note");
    }
    data.detail.signed = data.signed; 
    const assetRegistry = await getAssetRegistry(NS+'.VaccineDetail');
  
    await assetRegistry.update(data.detail);
  }
  

/**
   * create an order to purchase
   * @param {org.example.empty.CreateVaccineRecord} purchase - the order to be processed
   * @transaction
   */
  async function CreateVaccineRecord(data) {
    const factory = getFactory();
    const id = new Date().valueOf()+"";
    const vaccineRecord = factory.newResource(NS, 'VaccineRecord', id);
    
    vaccineRecord.family = data.family;
    
    const contractRegistry = await getAssetRegistry(NS + '.VaccineRecord');
    
    await contractRegistry.addAll([vaccineRecord]);
     
  }
  /**
   * create an order to purchase
   * @param {org.example.empty.CreateVaccineDetail} purchase - the order to be processed
   * @transaction
   */
  async function CreateVaccineDetail(data) {
    const factory = getFactory();
    const id = new Date().valueOf()+"";
    const vaccineDetail = factory.newResource(NS, 'VaccineDetail', id);
    
    vaccineDetail.vaccineName = data.vaccineName;
    vaccineDetail.physician = data.physician;
    vaccineDetail.doc = data.doc;
    vaccineDetail.vacRec = data.vacRec;
    
    const contractRegistry = await getAssetRegistry(NS + '.VaccineDetail');
    try{
      const added = await contractRegistry.addAll([vaccineDetail]);
      debugger;
      if(!vaccineDetail.vacRec.vaccineDetails) {
    		vaccineDetail.vacRec.vaccineDetails = [];
  		}
      vaccineDetail.vacRec.vaccineDetails.push(factory.newRelationship(NS, 'VaccineDetail', id));
      const assetRegistry = await getAssetRegistry(NS+'.VaccineRecord');
      await assetRegistry.update(vaccineDetail.vacRec);
    }catch(e){
    	console.log(e);
    }
  }