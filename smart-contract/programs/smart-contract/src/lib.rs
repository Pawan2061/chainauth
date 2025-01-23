use anchor_lang::prelude::*;

declare_id!("8Zg5r34kUNKQNc378SyphHPh1utKTMndzdoy6UDstCP4");

#[program]
pub mod smart_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
