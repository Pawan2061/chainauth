// SPDX-License-Identifier: GPL-3.0

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    program_error::ProgramError,
    system_instruction,
    system_program,
    sysvar::{rent::Rent, Sysvar},
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct PasswordAccount {
    pub key: String,
    pub value: String,
}

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;
    let user = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;

    if !user.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    if instruction_data.len() <= 1 {
        msg!("Invalid instruction data length");
        return Err(ProgramError::InvalidInstructionData);
    }

    let key_length = instruction_data[1] as usize;
    let key_end = 2 + key_length;
    
    if instruction_data.len() <= key_end {
        msg!("Invalid key data");
        return Err(ProgramError::InvalidInstructionData);
    }
    
    let key = String::from_utf8(instruction_data[2..key_end].to_vec())
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    let value = String::from_utf8(instruction_data[key_end..].to_vec())
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    msg!("Storing password for key: {}", key);
    
    let password = PasswordAccount { key, value };
    password.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Password stored successfully");
    Ok(())
}

solana_program::entrypoint!(process_instruction);
