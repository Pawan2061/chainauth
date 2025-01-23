// SPDX-License-Identifier: GPL-3.0

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Password {
    pub key: String,
    pub value: String,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct PasswordManager {
    pub passwords: Vec<Password>,
}

pub const PASSWORD_MANAGER_ACCOUNT: &[u8] = b"password_manager";

pub fn create_new_key(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    key: String,
    value: String,
) -> ProgramResult {
    let account_info = &accounts[0];
    let mut data = PasswordManager::try_from_slice(&account_info.data.borrow())?;
    
    // Check if the key already exists
    for password in &data.passwords {
        if password.key == key {
            return Err(solana_program::program_error::ProgramError::InvalidInstructionData);
        }
    }

    data.passwords.push(Password { key, value });
    data.serialize(&mut &mut account_info.data.borrow_mut()[..])?;
    Ok(())
}

pub fn get_my_password(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> ProgramResult {
    let account_info = &accounts[0];
    let data = PasswordManager::try_from_slice(&account_info.data.borrow())?;
    
    // For now, we'll just log the password info
    for password in &data.passwords {
        msg!("Key: {}, Value: {}", password.key, password.value);
    }

    Ok(())
}

pub fn delete_key(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    key: String,
) -> ProgramResult {
    let account_info = &accounts[0];
    let mut data = PasswordManager::try_from_slice(&account_info.data.borrow())?;
    
    let mut index_to_remove = None;
    for (i, password) in data.passwords.iter().enumerate() {
        if password.key == key {
            index_to_remove = Some(i);
            break;
        }
    }

    if let Some(index) = index_to_remove {
        data.passwords.swap_remove(index);
        data.serialize(&mut &mut account_info.data.borrow_mut()[..])?;
    } else {
        return Err(solana_program::program_error::ProgramError::InvalidInstructionData);
    }

    Ok(())
}

pub fn update_key(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    key: String,
    new_value: String,
) -> ProgramResult {
    let account_info = &accounts[0];
    let mut data = PasswordManager::try_from_slice(&account_info.data.borrow())?;

    let mut found = false;
    for password in &mut data.passwords {
        if password.key == key {
            password.value = new_value;
            found = true;
            break;
        }
    }

    if found {
        data.serialize(&mut &mut account_info.data.borrow_mut()[..])?;
        Ok(())
    } else {
        Err(solana_program::program_error::ProgramError::InvalidInstructionData)
    }
}

#[inline(always)]
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction_type = instruction_data[0];

    match instruction_type {
        0 => {
            let key = String::from_utf8(instruction_data[1..33].to_vec())?;
            let value = String::from_utf8(instruction_data[33..].to_vec())?;
            create_new_key(program_id, accounts, key, value)
        }
        1 => get_my_password(program_id, accounts),
        2 => {
            let key = String::from_utf8(instruction_data[1..33].to_vec())?;
            delete_key(program_id, accounts, key)
        }
        3 => {
            let key = String::from_utf8(instruction_data[1..33].to_vec())?;
            let value = String::from_utf8(instruction_data[33..].to_vec())?;
            update_key(program_id, accounts, key, value)
        }
        _ => Err(solana_program::program_error::ProgramError::InvalidInstructionData),
    }
}

#[cfg(not(feature = "no-entrypoint"))]
solana_program::entrypoint!(process_instruction);
