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

/**
 * create an order to purchase
 * @param {org.example.empty.DocNote} purchase - the order to be processed
 * @transaction
 */
async function DocNote(data) {
  data.detail.note = data.note; 
  let assetRegistry = await getAssetRegistry('org.example.empty.VaccineDetail');

  await assetRegistry.update(data.detail);
}

/**
 * create an order to purchase
 * @param {org.example.empty.CreateVaccineDetail} purchase - the order to be processed
 * @transaction
 */
async function CreateVaccineDetail(data) {
  const factory = getFactory();
  const NS = 'org.example.empty';
  let vacDetailId = new Date().valueOf()+"";
  const vaccineDetail = factory.newResource(NS, 'VaccineDetail', vacDetailId);
  
  vaccineDetail.vaccineName = data.vaccineName;
  vaccineDetail.physician = data.physician;
  vaccineDetail.doc = data.doc;
  vaccineDetail.vacRec = data.vacRec;
  
  const contractRegistry = await getAssetRegistry(NS + '.VaccineDetail');
  try{
    let added = await contractRegistry.addAll([vaccineDetail]);
    debugger;
    vaccineDetail.vacRec.vaccineDetails.push(factory.newRelationship(NS, 'VaccineDetail', vacDetailId));
    let assetRegistry = await getAssetRegistry('org.example.empty.VaccineRecord');
    await assetRegistry.update(vaccineDetail.vacRec);
  }catch(e){
    console.log(e);
  }
  
}