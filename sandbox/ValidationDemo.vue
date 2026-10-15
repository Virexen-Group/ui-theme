<script setup lang="ts">
import {ref,computed} from 'vue';
import VDateOfBirth from '../src/components/forms/VDateOfBirth.vue';
import VValidatedDate from '../src/components/forms/VValidatedDate.vue';
import VNameInput from '../src/components/forms/VNameInput.vue';
import VEmailInput from '../src/components/forms/VEmailInput.vue';
import VValidatedInput from '../src/components/forms/VValidatedInput.vue';
import {validateDate,validateEmail,validateText,ageOn} from '../src/utils/validation';
const dob=ref(''), appointment=ref(''), expiry=ref(''), email=ref(''), username=ref('');
const name=ref({first:'',middle:'',last:''});const middle=ref(true),minAge=ref(4),maxAge=ref(18);
const dobStatus=computed(()=>validateDate(dob.value,{rule:'past',required:true,minAge:minAge.value,maxAge:maxAge.value}));
const emailStatus=computed(()=>validateEmail(email.value,{required:true}));
const nameStatus=computed(()=>[validateText(name.value.first,{required:true,label:'First name'}),validateText(name.value.last,{required:true,label:'Last name'})].every(x=>x.valid));
const submitted=ref(false);
</script>
<template><main class="vx-validation-demo"><h1>Validation & smart form inputs</h1><p class="muted">Live component examples — these controls emit values and validation events; no user data is sent to external services.</p>
<section class="vx-validation-demo__panel"><h2>Full name</h2><label><input type="checkbox" v-model="middle"/> Include middle name</label><VNameInput v-model="name" :include-middle="middle" :min-length="1" :max-length="100"/><p class="muted">First and last are mandatory. Middle is optional unless configured otherwise.</p></section>
<section class="vx-validation-demo__panel"><h2>DOB & age verification</h2><div class="vx-validation-demo__row"><label>Minimum age <input class="vx-control" type="number" v-model.number="minAge" min="0" max="120"/></label><label>Maximum age <input class="vx-control" type="number" v-model.number="maxAge" min="0" max="120"/></label></div><VDateOfBirth v-model="dob" :min-age="minAge" :max-age="maxAge" required/><p :style="{color:dobStatus.valid?'var(--color-success)':'var(--vx-muted)'}">{{dobStatus.valid ? `Valid date of birth • Age ${ageOn(dob)}` : dobStatus.error}}</p></section>
<section class="vx-validation-demo__panel"><h2>Past, future or any date</h2><div class="vx-validation-demo__row"><VValidatedDate v-model="appointment" rule="future" label="Upcoming appointment" required/><VValidatedDate v-model="expiry" rule="any" label="Unrestricted date"/></div></section>
<section class="vx-validation-demo__panel"><h2>Email validation</h2><VEmailInput v-model="email" required/><p class="muted">Checks syntax locally. An optional <code>check-email</code> callback enables server-side deliverability or domain checks. This demo does not claim to verify mailbox ownership.</p></section>
<section class="vx-validation-demo__panel"><h2>Text rules & profanity</h2><VValidatedInput v-model="username" label="Public display name" required :min-length="3" :max-length="30" :profanity="['examplebadword']" placeholder="3–30 characters"/><p class="muted">Example custom banned word: <code>examplebadword</code>. Supply your own policy or API callback in production.</p></section>
<section class="vx-validation-demo__panel"><h2>Form validation</h2><button class="vx-button vx-button--primary" type="button" @click="submitted=true">Validate example form</button><p v-if="submitted" :style="{color:dobStatus.valid&&emailStatus.valid&&nameStatus?'var(--color-success)':'var(--color-danger)'}" role="status">{{dobStatus.valid&&emailStatus.valid&&nameStatus?'Required example fields are valid.':'Please complete the required name, DOB and email fields.'}}</p></section>
</main></template>
